export default function ({ app, redirect }) {
  if (!app.$cookies.get("auth") || app.$cookies.get("level") != 0) {
    return redirect("/");
  }
}
