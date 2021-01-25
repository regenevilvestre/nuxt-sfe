export default function ({ store, redirect, route }) {
  if (route.name === '/new' && !store.state.isAuth) {
    return redirect('/')
  } else if (route.name === 'edit-id' && !store.state.isAuth) {
    return redirect(`/view/${parseInt(route.params.id)}`)
  } else if (!store.state.isAuth) {
    return redirect('/')
  }
}
