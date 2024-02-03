import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Favorites'
}

export default function HeroLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}