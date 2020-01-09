Button component used for clickable actions

### It should

- Show a button with a defined text according to design
- It should show a plainer version given the prop `plain`
- It should invoke the function given as the prop `onClick`
- It should act as a link given the prop `to`
- It should not be clickable given the prop `disabled`
- It should darken on hover
- It should darken more on click

Basic button

```js
<Button onClick={() => alert('You clicked me')}>Click me is you can</Button>
```

Plain button

```js
<Button plain onClick={() => alert('You clicked me too')}>
  Click me too please
</Button>
```

Disabled button

```js
<Button disabled onClick={() => alert("Can't click this")}>
  I'm not available right now
</Button>
```
