import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Favorites'
}

export default function FavoriteNotes({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}