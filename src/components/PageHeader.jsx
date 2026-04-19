import { Container } from 'react-bootstrap'

export default function PageHeader({ title, subtitle }) {
  return (
    <Container className="pt-4 pb-3">
      <h1 className="mb-2">{title}</h1>
      <p className="text-muted mb-0">{subtitle}</p>
    </Container>
  )
}