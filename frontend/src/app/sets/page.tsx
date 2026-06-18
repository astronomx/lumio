import { auth, currentUser} from "@clerk/nextjs/server"
import { RedirectToSignIn } from "@clerk/nextjs";

import CreateStudySet from "@/components/CreateStudySet";

export default async function SetsPage() {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        return <RedirectToSignIn />
    }

    const user = await currentUser();

    return (
        <div className="p-5">
            <p>Hallo, {user?.firstName}</p>

            <CreateStudySet />
        </div>
    )
}