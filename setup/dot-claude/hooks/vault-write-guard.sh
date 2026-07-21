#!/usr/bin/env bash
# vault-write-guard: the AI drafts, you sign. And the vault has one door.
# (Day 6: law 1 · Day 10: law 2 · Day 6 make-it-yours: law 3)
input="$(cat)"
tool=$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_name",""))' 2>/dev/null)
case "$tool" in
  Write|Edit)
    # law 2: notes go through the doorway
    path=$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)
    case "$path" in
      "$HOME/vault/knowledge/"*|"$HOME/vault/projects/"*|"$HOME/vault/templates/"*|"$HOME/vault/inbox/"*)
        echo "vault-write-guard: notes go through the doorway. Use the vault command." >&2
        exit 2 ;;
    esac ;;
  Bash)
    cmd=$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)
    case "$cmd" in
      # law 1: committing is the human's signature
      *"git commit"*|*"git push"*)
        echo "vault-write-guard: committing is the human's signature. Show the draft and stop." >&2
        exit 2 ;;
      # law 3: deleting in the vault needs your hands
      *"rm "*vault*)
        echo "vault-write-guard: deleting in the vault needs your hands." >&2
        exit 2 ;;
    esac ;;
esac
exit 0
