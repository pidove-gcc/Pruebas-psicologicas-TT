export default function ({app,redirect}) {
    if (!app.$cookies.get('auth')) {
         return redirect('/login')
    }
   
}