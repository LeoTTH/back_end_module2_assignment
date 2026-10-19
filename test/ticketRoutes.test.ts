import request from "supertest";
import app from "../src/app";
import * as ticketController from "../src/api/v1/controllers/ticketControllers";

jest.mock("../src/api/v1/controllers/ticketControllers", () => ({
    getAllTickets: jest.fn((req, res) => res.status(200).send()),
    getTicketById: jest.fn((req, res) => res.status(200).send()),
    createTicket: jest.fn((req, res) => res.status(201).send()),
    updateTicket: jest.fn((req, res) => res.status(200).send()),
    deleteTicket: jest.fn((req, res) => res.status(200).send()),
    getTicketUrgency: jest.fn((req, res) => res.status(200).send())
}));

describe("Ticket Routes", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/tickets", () => {
        it("should call getAllTickets controller", async () => {
            // Arrange
            const endpoint: string = "/api/v1/tickets";

            // Act
            await request(app).get(endpoint);

            // Assert
            expect(ticketController.getAllTickets).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/tickets/:id", () => {
        it("should call getTicketById controller", async () => {
            // Arrange
            const endpoint: string = "/api/v1/tickets/1";

            // Act
            await request(app).get(endpoint);

            // Assert
            expect(ticketController.getTicketById).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/tickets", () => {
        it("should call createTicket controller", async () => {
            // Arrange
            const endpoint: string = "/api/v1/tickets";

            const ticketData = {
                title: "Test Ticket",
                description: "Test Description",
                priority: "high"
            };

            // Act
            await request(app)
                .post(endpoint)
                .send(ticketData);

            // Assert
            expect(ticketController.createTicket).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/tickets/:id", () => {
        it("should call updateTicket controller", async () => {
            // Arrange
            const endpoint: string = "/api/v1/tickets/1";

            const updateData = {
                status: "resolved"
            };

            // Act
            await request(app)
                .put(endpoint)
                .send(updateData);

            // Assert
            expect(ticketController.updateTicket).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/tickets/:id", () => {
        it("should call deleteTicket controller", async () => {
            // Arrange
            const endpoint: string = "/api/v1/tickets/1";

            // Act
            await request(app).delete(endpoint);

            // Assert
            expect(ticketController.deleteTicket).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/tickets/:id/urgency", () => {
        it("should call getTicketUrgency controller", async () => {
            // Arrange
            const endpoint: string = "/api/v1/tickets/1/urgency";

            // Act
            await request(app).get(endpoint);

            // Assert
            expect(ticketController.getTicketUrgency).toHaveBeenCalled();
        });
    });
});