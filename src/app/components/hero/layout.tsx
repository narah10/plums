import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Hero'
}

export default function HeroLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}