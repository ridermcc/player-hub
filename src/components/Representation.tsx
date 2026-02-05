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
    <div className="glass rounded-xl p-4 border border-border/50">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{agent.name}</p>
          <p className="text-sm text-primary">{agent.agency}</p>
          {agent.email && (
            <a
              href={`mailto:${agent.email}`}
              className="flex items-center gap-1 mt-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {agent.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
