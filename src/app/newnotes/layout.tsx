import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'New Notes'
}

export default function NewNotesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}