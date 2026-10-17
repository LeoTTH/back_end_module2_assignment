export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: "critical" | "high" | "medium" | "low";
    status: "open" | "in-progress" | "resolved";
    createdAt: Date;
}

export const tickets: Ticket[] = [
    {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: new Date("2026-10-16T10:00:00.000Z")
    },
    {
        id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: new Date("2026-10-17T10:00:00.000Z")
    }
];