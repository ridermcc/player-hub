interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export const SectionHeader = ({ title, icon }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon && <span className="text-primary">{icon}</span>}
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
    </div>
  );
};
