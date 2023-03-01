---

title: 'Custom Hooks Initial Implementation'

date: '2023-03-01'

---

# Custom Hooks Initial Implementation

In React framework, Custom Hook is a strong function. It can extract similar code logic. The powerful magic can make your component more clarity and remarkably improve your code quality.

Here are its entry practices. Let's go to code. The example is our familiar form Input.

```jsx
import { useState } from "react";

export default function Form() {
  const [firstName, setFirstName] = useState("Mary");
  const [lastName, setLastName] = useState("Poppins");

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name:
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p>
        <b>
          Good morning, {firstName} {lastName}.
        </b>
      </p>
    </>
  );
}
```

In the case ,It's not hard to find every input label have `value` and `onChange` props, and them logic is amazing same. At this time, custom hook born. Now create the first custom hook is named `useFormInput`.

```jsx
import { useState } from "react";

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}
```

Lastly, modify our code. The custom hook is completed!

```jsx
import { useFormInput } from "./useFormInput.js";

export default function Form() {
  const firstNameProps = useFormInput("Mary");
  const lastNameProps = useFormInput("Poppins");

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p>
        <b>
          Good morning, {firstNameProps.value} {lastNameProps.value}.
        </b>
      </p>
    </>
  );
}
```

Refer:

[Reusing Logic with Custom Hooks • React (reactjs.org)](https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks)
