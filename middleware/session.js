export default function ({store,redirect}) {
    if (!store.state.user.valid) {
         return redirect('/login')
    }
   
}