---
title: React state vs effects — when to reach for each
type: learning
created: 2026-06-21
tags: [react, frontend, hooks]
---

# React state vs effects — when to reach for each

**State** is memory that survives a re-render. **Effects** synchronise your
component with something *outside* React (the network, the DOM, a timer).

## The rule I keep forgetting
If a value can be *computed* from existing state during render, it is **not**
state — don't `useEffect` + `setState` to derive it. Just compute it inline.

```js
// ❌ derived-state-in-an-effect
useEffect(() => setFullName(first + ' ' + last), [first, last])
// ✅ just compute it
const fullName = first + ' ' + last
```

## When an effect really is right
- Fetching on mount (but prefer the framework loader — see [[sveltekit-server-boundary]]).
- Subscribing to an event source and cleaning up on unmount.

Related: error surfaces matter as much as logic — [[readable-error-messages]].
