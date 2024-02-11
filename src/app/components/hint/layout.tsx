import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Hints'
}

export default function NavigationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}