import { ChatWindow } from '../shared/ChatWindow'

export default function MessagesPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-[rgb(var(--intern-navy))] dark:text-foreground">Messages</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Vous pouvez discuter uniquement avec votre encadrant affecté.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {/*  "Ahmed Benali" est un nom temporaire — il faudra le remplacer par le vrai nom
             de l'encadrant affecté, récupéré depuis GET /profile une fois ce champ disponible. */}
        <ChatWindow contactName="Ahmed Benali" contactRole="Votre encadrant" />
      </div>
    </>
  )
}