import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Note Details'
}

export default function NoteDetails({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}