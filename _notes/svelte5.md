````markdown
# Svelte 5: Comprehensive Feature Overview

**Reference:** [Svelte Documentation](https://svelte.dev/docs/svelte)

Svelte 5 introduces a more intuitive reactivity model with runes, enhanced templating features, streamlined event handling, improved component ergonomics, and better SvelteKit integration. This summary provides a high-level overview of the core features and syntax.

## 1. Reactivity with Runes

Runes are special functions that mark variables, derived values, and effects as reactive. They replace the older label-based system, providing clearer, more composable reactivity.

### `$state`

**Purpose:** Declare reactive variables that trigger re-renders on change.

**Syntax:**

```svelte
let count = $state(0);
let user = $state({ name: 'Alice', age: 30 });
```
````

**Behavior:**

- Updates to `$state` variables cause component updates where they’re used.
- For objects/arrays, reassigning them is required to propagate changes, unless runes are also used within nested data.

**Example:**

```svelte
<script>
	let count = $state(0);
	const increment = () => (count += 1);
</script>

<button on:click={increment}>Count: {count}</button>
```

### `$derived`

**Purpose:** Create reactive values derived from other reactive data.

**Syntax:**

```svelte
let doubled = $derived(count * 2);
```

**Behavior:**

- Automatically updates when dependencies change.
- Computed lazily upon access, ensuring efficient updates.

**Example:**

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>

<p>Count: {count}, Doubled: {doubled}</p>
```

### `$effect`

**Purpose:** Run side-effect functions whenever reactive dependencies change.

**Syntax:**

```svelte
$effect(() => {
  console.log('Count is now:', count);
});
```

**Behavior:**

- Automatically tracks reactive variables used inside.
- Runs after DOM updates.
- Cleanup logic can be provided with `$effect.pre()`.

**Example:**

```svelte
<script>
	let count = $state(0);

	$effect(() => {
		console.log('Count changed:', count);
	});

	$effect.pre(() => {
		return () => {
			console.log('Cleanup before re-run or unmount');
		};
	});
</script>
```

### `$props`

**Purpose:** Declare component props reactively.

**Syntax:**

```svelte
<script>
	let { title, message = 'Hello' } = $props();
</script>
```

**Behavior:**

- Reacts to prop changes from the parent.
- Automatically triggers updates when props change.

### `$bindable`

**Purpose:** Enable two-way data binding on props.

**Syntax:**

```svelte
<script>
	let { value } = $props();
	let internalValue = $bindable(value);
</script>
```

**Behavior:**

- Works with `$props` to allow `bind:value` in parent components.
- Keeps parent and child values in sync.

### `$inspect`

**Purpose:** Debug reactive values by logging them when they change.

**Syntax:**

```svelte
$inspect(myVariable);
```

**Behavior:**

- Logs `myVariable` to the console on changes.
- Helps identify unexpected reactivity issues.

### `$derived.by`

**Purpose:** Derive reactive values from non-reactive sources.

**Syntax:**

```svelte
const externalCount = $derived.by(() => someExternalData.count);
```

**Behavior:**

- Useful for integrating promises, third-party data, or other non-reactive sources into the Svelte reactivity system.

## 2. Snippets

Snippets allow you to define reusable, parameterized blocks of markup—like functions for UI.

**Syntax:**

```svelte
@snippet greeting(name)
<h1>Hello, {name}!</h1>
@endsnippet

{@render greeting('World')}
```

**Behavior:**

- Fully reactive; updates when arguments change.
- Contain any Svelte template features, including loops and conditionals.
- Invoked using `{@render snippetName(args)}`.

## 3. Template Syntax Enhancements

### Event Modifiers and Shorthand

**Event Modifiers:**
Use modifiers to simplify event handling:

- `preventDefault`, `stopPropagation`, `once`, `self`, `trusted`, `passive`, `nonpassive`, `capture`

**Syntax:**

```svelte
<button on:click|once|stopPropagation={handleClick}>Click</button>
```

**Shorthand Directives:**

- If a variable matches the attribute name, use `:attribute`.
- If an event handler matches the event name, use `@event`.

**Example:**

```svelte
<script>
	let name = 'World';
	let handleClick = () => console.log('Clicked!');
</script>

<input :value={name} />
<button @click={handleClick}>Click Me</button>
```

## 4. Styling

### Scoped Styles

Styles in `<style>` tags are scoped by default, applying only to the current component.

### Global Styles

Use `:global()` to apply styles globally.

```svelte
<style>
	p :global(.global-class) {
		color: red;
	}
	:global(body) {
		margin: 0;
	}
</style>
```

## 5. Special Elements

### `<svelte:document>`

Attach event listeners to `document`.

```svelte
<svelte:document on:visibilitychange={handleVisibilityChange} />
```

### `<svelte:window>`

Attach event listeners or bind to `window` properties.

```svelte
<svelte:window on:resize={handleResize} bind:innerWidth={windowWidth} />
```

Bindable properties include `innerWidth`, `innerHeight`, `outerWidth`, `outerHeight`, `scrollX`, `scrollY`, and `online`.

### `<svelte:body>`

Attach event listeners to `document.body`.

```svelte
<svelte:body on:click={handleBodyClick} />
```

### `<svelte:head>`

Insert elements into the `document.head`.

```svelte
<svelte:head>
	<title>My Svelte App</title>
	<meta name="description" content="A Svelte 5 app" />
	<link rel="stylesheet" href="/global.css" />
</svelte:head>
```

### `<svelte:options>`

Set compiler options for the component.

```svelte
<svelte:options immutable={true} tag="my-component" />
```

## 6. Runtime Improvements

- **Smaller Bundle Size:** More efficient compiled output.
- **Enhanced Performance:** The granular reactivity model yields faster, more efficient updates.

## 7. Event Forwarding and Shorthand

### Event Forwarding

Forward child events to the parent without extra boilerplate.

```svelte
<!-- Child.svelte -->
<button on:click>Click Me</button>
```

```svelte
<!-- Parent.svelte -->
<Child on:click={handleChildClick} />
```

### Shorthand

If the event name and handler name match:

```svelte
<script>
	let handleClick = (e) => console.log(e);
</script>

<button @click={handleClick}>Click</button>
```

## 8. SvelteKit Enhancements

### Shallow Routing

Update the URL and some parts of the UI without re-running all `load` functions.

```js
goto('/new-path', { invalidateAll: false });
```

### Custom Status Codes and Headers

Return custom HTTP status and headers in `load` or form actions.

```js
import { error } from '@sveltejs/kit';

export async function load() {
	const result = await fetchData();
	if (!result.ok) {
		error(404, { message: 'Not found', headers: { 'X-Custom': 'value' } });
	}
}
```

### Simplified Form Actions

Forms are progressively enhanced by default (no `use:enhance` needed).

- Actions return data to pages under `data`.
- Submissions can be JSON, URL-encoded, or FormData.
- `formaction` attributes can trigger actions without JavaScript.

---

This summary covers the core concepts introduced or refined in Svelte 5. For the latest details, advanced usage, and official guidance, refer to the [Svelte Documentation](https://svelte.dev/docs/svelte).

```

```
