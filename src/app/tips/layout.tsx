import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tips'
}

export default function NavigationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}