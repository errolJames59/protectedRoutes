import { databases } from "../CreateClient";
import { DATABASE_ID, COLLECTION_ID } from "../CreateClient";

/* FETCHING ALL DOCUMENTS */
export async function getRegisteredNames(): Promise<RegisteredNames[]> {
    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
    )

    const users: RegisteredNames[] = response.documents.map((doc) => ({
        $id: doc.$id,
        $createdAt: doc.$createdAt,
        firstName: doc.firstName,
        lastName: doc.lastName,
        emailAddress: doc.emailAddress,
        username: doc.username
    }))

    return users;
}