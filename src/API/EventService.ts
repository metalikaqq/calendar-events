import { IEvent } from "../models/IEvent";
import $api from "../http";
import { Key } from "react";

class EventService {
  static async createEvents(event: IEvent) {
    const response = $api.post(`/events/create`, event, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async getEvents() {
    const response = $api.get(`/events`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }

  static async getEventsForUser(_id: Key) {
    const response = $api.get(`/events/user`, {
      params: { _id },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  }
}

export default EventService;