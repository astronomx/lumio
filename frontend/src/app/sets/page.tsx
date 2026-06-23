import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser} from "@clerk/nextjs/server"
import { isAuthenticated } from "@/services/AuthenticationService"

import CreateStudySet from "@/components/CreateStudySet";
import StudySets from "@/components/StudySets";

export default async function SetsPage() {
    // Check authentication, show sign-in if not
    try {
        await isAuthenticated();
    } catch {
        return <RedirectToSignIn />
    }

    const user = await currentUser();

    if (!user) {
        return <RedirectToSignIn />
    }

    return (
        <div className="p-5">
            <p>Hallo, {user.firstName}</p>
            <CreateStudySet />
            <StudySets userId={user.id} />
        </div>
    );
}