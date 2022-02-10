import React from "react"

const Header = ( {name} ) => <h1>{name}</h1>

const Part = ( {part} ) => <p> {part.name} {part.exercises} </p>

const Content = ( {parts} ) => {
  return (
    <>
      {parts.map((part) => (
        <Part key = {part.id} part = {part} />
      ))}
    </>
  )
}

const Total = ( {parts} ) => {
  const sum = parts.reduce((total, eachPart) => total + eachPart.exercises, 0)
  return (
    <>
      <strong> total of {sum} exercises </strong>
    </>
  )
}

const Course = ( {course} ) => {
  return (
    <>
      <Header name = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}

export default Course