import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Add New Task'
}

export default function TaskFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}