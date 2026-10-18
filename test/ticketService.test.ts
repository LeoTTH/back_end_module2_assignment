import * as ticketService from "../src/api/v1/services/ticketService";
import { tickets, Ticket } from "../src/data/tickets";

describe("Ticket Service - Urgency Calculation", () => {

    afterEach(() => {
        // Remove test tickets after each test
        for (let id = 100; id <= 103; id++) {
            const index: number = tickets.findIndex(
                (ticket: Ticket) => ticket.id === id
            );

            if (index !== -1) {
                tickets.splice(index, 1);
            }
        }
    });

    it("should calculate low urgency correctly", async () => {
        // Arrange
        const threeDaysAgo: Date = new Date();
        threeDaysAgo.setDate(
            threeDaysAgo.getDate() - 3
        );

        tickets.push({
            id: 100,
            title: "Low urgency test",
            description: "Testing low urgency",
            priority: "low",
            status: "open",
            createdAt: threeDaysAgo
        });

        // Act
        const result =
            await ticketService.calculateTicketUrgency(100);

        // Assert
        expect(result).toBeDefined();
        expect(result?.ticketAge).toBe(3);
        expect(result?.urgencyScore).toBe(25);
        expect(result?.urgencyLevel).toBe(
            "Low urgency. Address when capacity allows."
        );
    });

    it("should calculate high urgency correctly", async () => {
        // Arrange
        const fiveDaysAgo: Date = new Date();
        fiveDaysAgo.setDate(
            fiveDaysAgo.getDate() - 5
        );

        tickets.push({
            id: 101,
            title: "High urgency test",
            description: "Testing high urgency",
            priority: "high",
            status: "open",
            createdAt: fiveDaysAgo
        });

        // Act
        const result =
            await ticketService.calculateTicketUrgency(101);

        // Assert
        expect(result).toBeDefined();
        expect(result?.ticketAge).toBe(5);
        expect(result?.urgencyScore).toBe(55);
        expect(result?.urgencyLevel).toBe(
            "High urgency. Prioritize resolution."
        );
    });

    it("should calculate critical urgency correctly", async () => {
        // Arrange
        const sixDaysAgo: Date = new Date();
        sixDaysAgo.setDate(
            sixDaysAgo.getDate() - 6
        );

        tickets.push({
            id: 102,
            title: "Critical urgency test",
            description: "Testing critical urgency",
            priority: "critical",
            status: "open",
            createdAt: sixDaysAgo
        });

        // Act
        const result =
            await ticketService.calculateTicketUrgency(102);

        // Assert
        expect(result).toBeDefined();
        expect(result?.ticketAge).toBe(6);
        expect(result?.urgencyScore).toBe(80);
        expect(result?.urgencyLevel).toBe(
            "Critical. Immediate attention required."
        );
    });

    it("should return minimal urgency for resolved tickets", async () => {
        // Arrange
        const tenDaysAgo: Date = new Date();
        tenDaysAgo.setDate(
            tenDaysAgo.getDate() - 10
        );

        tickets.push({
            id: 103,
            title: "Resolved ticket test",
            description: "Testing resolved ticket",
            priority: "critical",
            status: "resolved",
            createdAt: tenDaysAgo
        });

        // Act
        const result =
            await ticketService.calculateTicketUrgency(103);

        // Assert
        expect(result).toBeDefined();
        expect(result?.urgencyScore).toBe(0);
        expect(result?.urgencyLevel).toBe(
            "Minimal. Ticket resolved."
        );
    });
});