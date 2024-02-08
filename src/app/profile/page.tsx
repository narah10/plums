import Navigation from "../components/navigation/page";

function Profile(){
    return(
        <main className="flex flex-col lg:flex-row min-h-screenp-24">
             <Navigation />
            <div className="lg:flex lg:flex-1">
                <h1>Profile</h1>
            </div>
        </main>
    )
}

export default Profile;