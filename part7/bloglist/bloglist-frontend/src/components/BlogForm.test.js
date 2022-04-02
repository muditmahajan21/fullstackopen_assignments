import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const input = component.container.querySelector("#title");
  const form = component.container.querySelector("form");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  fireEvent.change(input, {
    target: { value: "Go To Statement Considered Harmful" },
  });

  fireEvent.change(author, {
    target: { value: "Edsger W. Dijkstra" },
  });

  fireEvent.change(url, {
    target: {
      value:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(
    "Go To Statement Considered Harmful"
  );
  expect(createBlog.mock.calls[0][0].author).toBe("Edsger W. Dijkstra");
  expect(createBlog.mock.calls[0][0].url).toBe(
    "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
  );
});
