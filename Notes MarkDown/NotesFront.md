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
