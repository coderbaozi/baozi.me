---

title: 'React18 Suspense'

date: '2023-08-23'

---
# React18 Suspense

## prefetch

maybe u will use the code to fetch data from back

```js
import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div>
      {products.map((product, index) => (
        <li key={index}>{product.id}</li>
      ))}
    </div>
  );
}
```

but do  u consider prefetching the data at the Home componet render before?let's continue.

```js
import { useState, useEffect } from 'react';

// Record<string,unknown>
const globalMap = {};

const callbacks = new Set();
fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    globalMap['1'] = data.products;
    callbacks.forEach((fn) => {
      fn('1');
    });
  });

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (globalMap['1']) {
      setProducts(globalMap['1']);
    } else {
      callbacks.add((key) => {
        if (key === '1') {
          setProducts(globalMap['1']);
        }
      });
    }
  }, []);

  return (
    <div>
      {products.map((product, index) => (
        <li key={index}>{product.id}</li>
      ))}
    </div>
  );
}

```

congratulations!you got it.

this is a sample useSWR modal!

## useSWR

let me refactor the code use `useSWR`

```js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data } = useSWR('https://dummyjson.com/products', fetcher);
  const products = data?.products ?? [];

  return (
    <ul>
      {products.map((product, index) => (
        <li key={index}>{product.id}</li>
      ))}
    </ul>
  );
}

```

let's continue,if we want add a loading ui at the api is fetching

```js
import { useState, useEffect } from 'react';

// Record<string,unknown>
const globalMap = {};

const callbacks = new Set();
fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    globalMap['1'] = data.products;
    callbacks.forEach((fn) => {
      fn('1');
    });
  });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (globalMap['1']) {
      setProducts(globalMap['1']);
      setLoading(true);
    } else {
      callbacks.add((key) => {
        if (key === '1') {
          setProducts(globalMap['1']);
          setLoading('true');
        }
      });
    }
  }, []);

  return loading ? (
    <div>
      {products.map((product, index) => (
        <li key={index}>{product.id}</li>
      ))}
    </div>
  ) : (
    <div>loading</div>
  );
}

```

now,let me back react 18 suspense resolve what.

```js
import { Suspense } from 'react';

let isSuccess = false;
let list = null;
function List({ products }) {
  return (
    <div>
      {products.map((product, index) => (
        <li key={index}>{product.id}</li>
      ))}
    </div>
  );
}

const promise = fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    isSuccess = true;
    list = data.products;
    return;
  });

function Inner() {
  if (isSuccess) {
    return <List products={list} />;
  } else {
    throw promise;
  }
}
export default function Home() {
  return (
    <Suspense fallback="loading">
      <Inner />
    </Suspense>
  );
}

```
