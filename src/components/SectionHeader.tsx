interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export const SectionHeader = ({ title, icon }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {icon && <span className="text-primary">{icon}</span>}
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
};
