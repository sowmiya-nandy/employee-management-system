import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../app/login/page";
import api from "../services/api";

window.alert = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock("../services/api", () => ({
  post: jest.fn(),
}));

describe("Login Page", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test("renders login form", () => {
    render(<Login />);

    expect(
      screen.getByText("Employee Management System")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Password")
    ).toBeInTheDocument();
  });


  test("login button calls API and stores token", async () => {

    (api.post as jest.Mock).mockResolvedValue({
      data: {
        token: "test-token",
        user: {
          name: "Admin"
        }
      }
    });


    render(<Login />);


    fireEvent.change(
      screen.getByPlaceholderText("Email"),
      {
        target: {
          value: "admin@gmail.com"
        }
      }
    );


    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456"
        }
      }
    );


    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i
      })
    );


    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/auth/login",
        {
          email: "admin@gmail.com",
          password: "123456"
        }
      );
    });


    expect(
      localStorage.getItem("token")
    ).toBe("test-token");

  });

});
test("shows error message when login fails", async () => {

  (api.post as jest.Mock).mockRejectedValue({
    response: {
      data: {
        message: "Invalid credentials"
      }
    }
  });


  render(<Login />);


  fireEvent.change(
    screen.getByPlaceholderText("Email"),
    {
      target: {
        value: "wrong@gmail.com"
      }
    }
  );


  fireEvent.change(
    screen.getByPlaceholderText("Password"),
    {
      target: {
        value: "wrong123"
      }
    }
  );


  fireEvent.click(
    screen.getByRole("button", {
      name: /login/i
    })
  );


  await waitFor(() => {
    expect(api.post).toHaveBeenCalledWith(
      "/auth/login",
      {
        email: "wrong@gmail.com",
        password: "wrong123"
      }
    );
  });

});