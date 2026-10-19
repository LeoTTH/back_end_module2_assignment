import { Ticket, tickets } from "../../../data/tickets";

// Service function to get all tickets
export const getAllTickets = async (): Promise<Ticket[]> => {
    return structuredClone(tickets);
};

// Service function to get a ticket by ID
export const getTicketById = async (id: number): Promise<Ticket | undefined> => {
    const ticket: Ticket | undefined = tickets.find(
        (ticket) => ticket.id === id
    );

    return ticket ? structuredClone(ticket) : undefined;
};

// Service function to create a new ticket
export const createTicket = async (
    ticketData: {
        title: string;
        description: string;
        priority: Ticket["priority"];
    }
): Promise<Ticket> => {

    const newId: number =
        tickets.length > 0
            ? Math.max(...tickets.map((ticket: Ticket) => ticket.id)) + 1
            : 1;

    const newTicket: Ticket = {
        id: newId,
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority,
        status: "open",
        createdAt: new Date()
    };

    tickets.push(newTicket);

    return structuredClone(newTicket);
};

// Service function to update a ticket by ID
export const updateTicket = async (
    id: number,
    updateData: Partial<Pick<Ticket, "title" | "description" | "priority" | "status">>
): Promise<Ticket | undefined> => {

    const index: number = tickets.findIndex(
        (ticket: Ticket) => ticket.id === id
    );

    if (index === -1) {
        return undefined;
    }

    tickets[index] = {
        ...tickets[index],
        ...updateData
    };

    return structuredClone(tickets[index]);
};

// Service function to delete a ticket by ID
export const deleteTicket = async (
    id: number
): Promise<boolean> => {

    const index: number = tickets.findIndex(
        (ticket: Ticket) => ticket.id === id
    );

    if (index === -1) {
        return false;
    }

    tickets.splice(index, 1);

    return true;
};

export interface TicketUrgency {
    id: number;
    title: string;
    priority: Ticket["priority"];
    status: Ticket["status"];
    createdAt: Date;
    ticketAge: number;
    urgencyScore: number;
    urgencyLevel: string;
}

// Service function to calculate ticket urgency
export const calculateTicketUrgency = async (
    id: number
): Promise<TicketUrgency | undefined> => {

    const ticket: Ticket | undefined = tickets.find(
        (ticket: Ticket) => ticket.id === id
    );

    if (!ticket) {
        return undefined;
    }

    const millisecondsPerDay: number =
        1000 * 60 * 60 * 24;

    const ticketAge: number = Math.floor(
        (Date.now() - ticket.createdAt.getTime()) /
        millisecondsPerDay
    );

    if (ticket.status === "resolved") {
        return {
            id: ticket.id,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            createdAt: ticket.createdAt,
            ticketAge,
            urgencyScore: 0,
            urgencyLevel: "Minimal. Ticket resolved."
        };
    }

    let baseScore: number;

    switch (ticket.priority) {
        case "critical":
            baseScore = 50;
            break;

        case "high":
            baseScore = 30;
            break;

        case "medium":
            baseScore = 20;
            break;

        case "low":
            baseScore = 10;
            break;
    }

    const urgencyScore: number =
        baseScore + ticketAge * 5;

    let urgencyLevel: string;

    if (urgencyScore >= 80) {
        urgencyLevel =
            "Critical. Immediate attention required.";
    } else if (urgencyScore >= 55) {
        urgencyLevel =
            "High urgency. Prioritize resolution.";
    } else if (urgencyScore >= 30) {
        urgencyLevel =
            "Moderate. Schedule for attention.";
    } else {
        urgencyLevel =
            "Low urgency. Address when capacity allows.";
    }

    return {
        id: ticket.id,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
        ticketAge,
        urgencyScore,
        urgencyLevel
    };
};