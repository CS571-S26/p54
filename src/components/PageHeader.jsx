import { Container } from 'react-bootstrap'

export default function PageHeader({ title, subtitle }) {
  return (
    <Container className="mt-4 mb-4">
      <h1>{title}</h1>
      <p className="text-muted">{subtitle}</p>
    </Container>
  )
}