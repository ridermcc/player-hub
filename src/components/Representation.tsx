import { User, Mail } from "lucide-react";

interface Agent {
  name: string;
  agency: string;
  email?: string;
  phone?: string;
}

interface RepresentationProps {
  agent: Agent;
}

export const Representation = ({ agent }: RepresentationProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground">{agent.name}</p>
          <p className="text-sm text-primary font-medium">{agent.agency}</p>
        </div>
      </div>
      {agent.email && (
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 mt-3 pt-3 border-t border-border text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail className="w-4 h-4" />
          {agent.email}
        </a>
      )}
    </div>
  );
};
