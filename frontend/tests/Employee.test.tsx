import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Employee from "../app/employees/page";
import api from "../services/api";

window.alert = jest.fn();

jest.mock("../services/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("Employee Page", () => {

  test("renders employee list", async () => {

    (api.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          name: "John",
          email: "john@gmail.com",
          department: "IT",
          salary: 50000
        },
        {
          id: 2,
          name: "David",
          email: "david@gmail.com",
          department: "HR",
          salary: 40000
        }
      ]
    });


    render(<Employee />);


    await waitFor(() => {
      expect(
        screen.getByText("John")
      ).toBeInTheDocument();

      expect(
        screen.getByText("David")
      ).toBeInTheDocument();
    });

  });



  test("deletes employee successfully", async () => {

    (api.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: 1,
          name: "John",
          email: "john@gmail.com",
          department: "IT",
          salary: 50000
        }
      ]
    });


    (api.delete as jest.Mock).mockResolvedValue({
      data: {
        message: "Employee deleted"
      }
    });


    render(<Employee />);


    await waitFor(() => {
      expect(
        screen.getByText("John")
      ).toBeInTheDocument();
    });


    fireEvent.click(
      screen.getByRole("button", {
        name: /delete/i
      })
    );


    await waitFor(() => {
      expect(api.delete).toHaveBeenCalled();
    });

  });



  test("adds employee successfully", async () => {

    (api.get as jest.Mock).mockResolvedValue({
      data: []
    });


    (api.post as jest.Mock).mockResolvedValue({
      data: {
        message: "Employee Added"
      }
    });


    render(<Employee />);


    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /add employee/i
        })
      ).toBeInTheDocument();
    });


    fireEvent.click(
      screen.getByRole("button", {
        name: /add employee/i
      })
    );


    fireEvent.change(
      screen.getByPlaceholderText("Employee Name"),
      {
        target: {
          value: "Sowmiya"
        }
      }
    );


    fireEvent.change(
      screen.getByPlaceholderText("Employee Email"),
      {
        target: {
          value: "sowmiya@gmail.com"
        }
      }
    );


    fireEvent.change(
      screen.getByPlaceholderText("Department"),
      {
        target: {
          value: "IT"
        }
      }
    );


    fireEvent.change(
      screen.getByPlaceholderText("Salary"),
      {
        target: {
          value: "50000"
        }
      }
    );


    fireEvent.click(
      screen.getByRole("button", {
        name: /save/i
      })
    );


    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/employees",
        {
          name: "Sowmiya",
          email: "sowmiya@gmail.com",
          department: "IT",
          salary: "50000"
        }
      );
    });

  });
  test("updates employee successfully", async () => {

  (api.get as jest.Mock).mockResolvedValue({
    data: [
      {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        department: "IT",
        salary: 50000
      }
    ]
  });


  (api.put as jest.Mock).mockResolvedValue({
    data: {
      message: "Employee Updated"
    }
  });


  render(<Employee />);


  await waitFor(() => {
    expect(
      screen.getByText("John")
    ).toBeInTheDocument();
  });


  fireEvent.click(
    screen.getByRole("button", {
      name: /edit/i
    })
  );


  fireEvent.click(
    screen.getByRole("button", {
      name: /update/i
    })
  );


  await waitFor(() => {
    expect(api.put).toHaveBeenCalled();
  });

});

});