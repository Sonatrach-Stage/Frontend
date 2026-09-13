import { DocumentsLibrary } from '../shared/DocumentsLibrary'
import { internDocuments } from '../../data/dashboardMockData'

export default function DocumentsPage() {
  return <DocumentsLibrary title="Documents" subtitle="Documents de tous vos stagiaires." documents={internDocuments} />
}