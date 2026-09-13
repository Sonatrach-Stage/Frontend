import { DocumentsLibrary } from '../shared/DocumentsLibrary'
import { internDocuments } from '../../data/dashboardMockData'

export default function MyDocumentsPage() {
  return <DocumentsLibrary title="Mes documents" subtitle="Convention, rapports et attestation." documents={internDocuments} />
}