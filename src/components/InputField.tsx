import React from 'react'
import { useField } from 'formik'
import styled from '@emotion/styled'

type InputProps = {
  name: string
  type: 'email' | 'password' | 'text'
  label?: string
  placeholder?: string
}

const ErrorMsg = styled.div`
  color: #d62701;
  margin-top: 4px;
`

export const InputField = ({ label, name, type }: InputProps) => {
  const props = { name, type }

  const [field, meta] = useField(props)

  return (
    <>
      <input className="form-control form-control-lg" {...field} {...props} />
      {meta.touched && meta.error ? <ErrorMsg>{meta.error}</ErrorMsg> : null}
    </>
  )
}
