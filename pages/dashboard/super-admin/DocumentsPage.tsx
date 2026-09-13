import { DocumentsLibrary } from '../shared/DocumentsLibrary'
import { internDocuments } from '../../data/dashboardMockData'

export default function DocumentsPage() {
  return <DocumentsLibrary title="Documents" subtitle="Bibliothèque centralisée de toute la plateforme." documents={internDocuments} />
}