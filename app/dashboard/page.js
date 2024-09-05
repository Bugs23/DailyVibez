import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Main from "../components/Main";

export const metadata = {
    title: "DailyVibez ⋅ Dashboard",
};

export default function DashboardPage() {

    const isAuthenticated = false

    // Set children as Login page by default
    let children = (
        <Login />
    )

    // If user has been authenticated set children as Dashboard page
    if (isAuthenticated) {
        children = (
            <Dashboard />
        )
    }

    return (
        <Main>
            {children}
        </Main>
    )
}