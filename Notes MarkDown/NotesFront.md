# Steps

1. initialize vite and install starter packages (react-router-dom / react query / styled-components)
2. adding theme provider & query client provider & react query dev tool
3. definding project Routes and the nested Routes with a layout component & outlet
4. defining the 404 or notFound route and pass the NotFound component

# notes

1. you can't define absolute route `/product` nested under another route, it have to be relative to the parent route `product`
2. Notice that you can also wrap some routes that don't share a common route inside a `<Route/>` that does't have a path attribute
3. `<Outlet context={name:'hamza'}>` you can pass inside Outlet a context variable which will be a shared variable that can be accessed from all nested pages, and it can be accessed using `const obj = useOutletContext()`
4. dynamic Routes `/product/:id` can be accessed using `useParams()`
5. we can use beside the layout component and outlet in nested routes, another `<Routes/>` to render diffirent layouts for different routes (like this example we didn't add a header for the `/login` and `/register` routes)
   ```
     <Routes >
        <Route path='/login' />
        <Route path='/register' />
        <Route path='*' element={<h2>header</h2>} />
     </Routes>
   ```
6. to make a dimension responsive, use % size but be aware of to what level you want the dimension to still response and limit it using min-height & max-height or min-width & max-width
7. A function that sets Authorization header for all subsequent axios requsts to the server
   ```
   const setAuthToken = (token) => {
      if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
      delete axios.defaults.headers.common['Authorization'];
      }
   };
   ```
8. `onBlur` event is the opposite of `onFocused` event, it is to trigger an "unfocus" action when an input element loses focus.
9. use functional update in react instead of any other way `setArrayState(prevArray => [newElement, ...prevArray])` like `unshift` or `push`
10. the nature of update state functions may leads to error such as it can't see the event object inside it because it is not executed instatly so you can capture the `e.currentTarget.value` in a variable outside the state update function, so it is available inside the closure when setNotes is called.
    ```
      const handleTyping = (e, id) => {
         const updatedValue = e.currentTarget.value; // Store the value in a variable
         setNotes((prev) =>
            prev.map((note) => (note._id === id ? { ...note, content: updatedValue } : note))
         );
      };
    ```
11. there is no data attribute in fetch response

```
   const response = await fetch(`http://localhost:6060/api/notes`, config);
   return response.json();

   const response = await axios.get('http://localhost:6060/api/notes', config);
   return response.data;
```

13. in post request in axios remember to add the body as the second argument or pass it with null if there is no body

    ```
      const response = await axios.post(`http://localhost:6060/api/notes/status/${id}/?active=${isActive}`, null, config);
      return response.data;

      const response = await fetch(`http://localhost:6060/api/notes/status/${id}/?active=${isActive}`, config);
      const data = await response.json();
      return data;
    ```
