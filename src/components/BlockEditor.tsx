
import React, { useState } from 'react';
import { Block } from '@/context/MockAuthContext';
import { Trash2, Edit2, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from './ui/input';
import { Label } from './ui/label';

interface BlockEditorProps {
  block: Block;
  children: React.ReactNode;
  onUpdate?: (id: string, updates: Partial<Block>) => void;
  onDelete?: (id: string) => void;
}

export const BlockEditor = ({ block, children, onUpdate, onDelete }: BlockEditorProps) => {
  const [editOpen, setEditOpen] = useState(false);

  const toggleVisibility = () => {
    onUpdate?.(block.id, { isVisible: !block.isVisible });
  };

  return (
    <div className="relative group w-full">
      {/* Hover toolbar */}
      <div className="absolute -top-3 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-background shadow-sm"
          onClick={toggleVisibility}
          title={block.isVisible ? 'Hide' : 'Show'}
        >
          {block.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
        </Button>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="h-7 w-7 bg-background shadow-sm">
              <Edit2 className="w-3 h-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block</DialogTitle>
            </DialogHeader>
            <BlockEditForm block={block} onUpdate={onUpdate} onClose={() => setEditOpen(false)} />
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          size="icon"
          className="h-7 w-7 shadow-sm"
          onClick={() => onDelete?.(block.id)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      <div className="ring-0 group-hover:ring-2 ring-primary/20 rounded-2xl transition-all">
        {children}
      </div>
    </div>
  );
};

// ── Per-type edit forms ──────────────────────────────────────

interface BlockEditFormProps {
  block: Block;
  onUpdate?: (id: string, updates: Partial<Block>) => void;
  onClose: () => void;
}

const BlockEditForm = ({ block, onUpdate, onClose }: BlockEditFormProps) => {
  const [title, setTitle] = useState(block.title);

  const save = (extra: Partial<Block> = {}) => {
    onUpdate?.(block.id, { title, ...extra });
    onClose();
  };

  switch (block.type) {
    case 'stats':
      return <StatsEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'video':
      return <VideoEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'games':
      return <GamesEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'journey':
      return <JourneyEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'partnerships':
      return <PartnershipsEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'representation':
      return <RepresentationEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'social':
      return <SocialEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'link':
      return <LinkEditForm block={block} title={title} setTitle={setTitle} save={save} />;
    case 'header':
    default:
      return (
        <div className="space-y-4 py-4">
          <Field label="Title" value={title} onChange={setTitle} />
          <Button onClick={() => save()} className="w-full">Save</Button>
        </div>
      );
  }
};

// ── Shared field helper ──────────────────────────────────────

const Field = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div className="space-y-1.5">
    <Label className="text-xs">{label}</Label>
    <Input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
  </div>
);

// ── Stats ────────────────────────────────────────────────────

const StatsEditForm = ({ block, title, setTitle, save }: any) => {
  const [stats, setStats] = useState(block.stats || { gamesPlayed: 0, goals: 0, assists: 0, points: 0, plusMinus: '0', pim: 0 });
  const [season, setSeason] = useState(block.season || '2024-25');
  const [league, setLeague] = useState(block.league || '');

  const updateStat = (key: string, val: string) => {
    setStats((s: any) => ({ ...s, [key]: key === 'plusMinus' ? val : Number(val) || 0 }));
  };

  return (
    <div className="space-y-4 py-4">
      <Field label="Section Title" value={title} onChange={setTitle} />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Season" value={season} onChange={setSeason} placeholder="2024-25" />
        <Field label="League" value={league} onChange={setLeague} placeholder="OHL" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label="GP" value={String(stats.gamesPlayed)} onChange={v => updateStat('gamesPlayed', v)} />
        <Field label="Goals" value={String(stats.goals)} onChange={v => updateStat('goals', v)} />
        <Field label="Assists" value={String(stats.assists)} onChange={v => updateStat('assists', v)} />
        <Field label="Points" value={String(stats.points)} onChange={v => updateStat('points', v)} />
        <Field label="+/-" value={String(stats.plusMinus)} onChange={v => updateStat('plusMinus', v)} />
        <Field label="PIM" value={String(stats.pim)} onChange={v => updateStat('pim', v)} />
      </div>
      <Button onClick={() => save({ stats, season, league })} className="w-full">Save</Button>
    </div>
  );
};

// ── Video ────────────────────────────────────────────────────

const VideoEditForm = ({ block, title, setTitle, save }: any) => {
  const [videoUrl, setVideoUrl] = useState(block.videoUrl || '');
  return (
    <div className="space-y-4 py-4">
      <Field label="Section Title" value={title} onChange={setTitle} />
      <Field label="Video Embed URL" value={videoUrl} onChange={setVideoUrl} placeholder="https://player.vimeo.com/video/..." />
      <p className="text-xs text-muted-foreground">Paste a Vimeo or YouTube embed URL</p>
      <Button onClick={() => save({ videoUrl })} className="w-full">Save</Button>
    </div>
  );
};

// ── Games ────────────────────────────────────────────────────

const GamesEditForm = ({ block, title, setTitle, save }: any) => {
  const [games, setGames] = useState(block.gamesList || []);

  const addGame = () => setGames([...games, { date: '', time: '', opponent: '', location: '', isHome: true }]);
  const removeGame = (i: number) => setGames(games.filter((_: any, idx: number) => idx !== i));
  const updateGame = (i: number, key: string, val: any) => {
    const updated = [...games];
    updated[i] = { ...updated[i], [key]: val };
    setGames(updated);
  };

  return (
    <div className="space-y-4 py-4">
      <Field label="Section Title" value={title} onChange={setTitle} />
      {games.map((g: any, i: number) => (
        <div key={i} className="p-3 border rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-muted-foreground">Game {i + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeGame(i)} className="h-6 text-xs text-destructive">Remove</Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Date" value={g.date} onChange={v => updateGame(i, 'date', v)} placeholder="Feb 7" />
            <Field label="Time" value={g.time} onChange={v => updateGame(i, 'time', v)} placeholder="7:00 PM" />
          </div>
          <Field label="Opponent" value={g.opponent} onChange={v => updateGame(i, 'opponent', v)} />
          <Field label="Location" value={g.location} onChange={v => updateGame(i, 'location', v)} />
          <Field label="Logo URL" value={g.logo || ''} onChange={v => updateGame(i, 'logo', v)} placeholder="https://..." />
          <Field label="Watch Link" value={g.watchLink || ''} onChange={v => updateGame(i, 'watchLink', v)} />
        </div>
      ))}
      <Button variant="outline" onClick={addGame} className="w-full">+ Add Game</Button>
      <Button onClick={() => save({ gamesList: games })} className="w-full">Save</Button>
    </div>
  );
};

// ── Journey ──────────────────────────────────────────────────

const JourneyEditForm = ({ block, title, setTitle, save }: any) => {
  const [items, setItems] = useState(block.journeyItems || []);

  const addItem = () => setItems([...items, { year: '', team: '', league: '', role: '' }]);
  const removeItem = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));
  const updateItem = (i: number, key: string, val: string) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [key]: val };
    setItems(updated);
  };

  return (
    <div className="space-y-4 py-4">
      <Field label="Section Title" value={title} onChange={setTitle} />
      {items.map((item: any, i: number) => (
        <div key={i} className="p-3 border rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-muted-foreground">Stop {i + 1}</span>
            <Button variant="ghost" size="sm" onClick={() => removeItem(i)} className="h-6 text-xs text-destructive">Remove</Button>
          </div>
          <Field label="Team" value={item.team} onChange={v => updateItem(i, 'team', v)} />
          <div className="grid grid-cols-2 gap-2">
            <Field label="League" value={item.league} onChange={v => updateItem(i, 'league', v)} />
            <Field label="Years" value={item.year} onChange={v => updateItem(i, 'year', v)} placeholder="2020-2022" />
          </div>
          <Field label="Role/Notes" value={item.role || ''} onChange={v => updateItem(i, 'role', v)} />
          <Field label="Logo URL" value={item.logo || ''} onChange={v => updateItem(i, 'logo', v)} />
        </div>
      ))}
      <Button variant="outline" onClick={addItem} className="w-full">+ Add Stop</Button>
      <Button onClick={() => save({ journeyItems: items })} className="w-full">Save</Button>
    </div>
  );
};

// ── Partnerships ─────────────────────────────────────────────

const PartnershipsEditForm = ({ block, title, setTitle, save }: any) => {
  const [partners, setPartners] = useState(block.partnersList || []);

  const addPartner = () => setPartners([...partners, { id: crypto.randomUUID(), name: '', logo: '', url: '' }]);
  const removePartner = (i: number) => setPartners(partners.filter((_: any, idx: number) => idx !== i));
  const updatePartner = (i: number, key: string, val: string) => {
    const updated = [...partners];
    updated[i] = { ...updated[i], [key]: val };
    setPartners(updated);
  };

  return (
    <div className="space-y-4 py-4">
      <Field label="Section Title" value={title} onChange={setTitle} />
      {partners.map((p: any, i: number) => (
        <div key={i} className="p-3 border rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-muted-foreground">{p.name || `Partner ${i + 1}`}</span>
            <Button variant="ghost" size="sm" onClick={() => removePartner(i)} className="h-6 text-xs text-destructive">Remove</Button>
          </div>
          <Field label="Name" value={p.name} onChange={v => updatePartner(i, 'name', v)} />
          <Field label="URL" value={p.url} onChange={v => updatePartner(i, 'url', v)} />
          <Field label="Promo Code" value={p.promoCode || ''} onChange={v => updatePartner(i, 'promoCode', v)} />
          <Field label="Discount" value={p.discount || ''} onChange={v => updatePartner(i, 'discount', v)} placeholder="15% OFF" />
        </div>
      ))}
      <Button variant="outline" onClick={addPartner} className="w-full">+ Add Partner</Button>
      <Button onClick={() => save({ partnersList: partners })} className="w-full">Save</Button>
    </div>
  );
};

// ── Representation ───────────────────────────────────────────

const RepresentationEditForm = ({ block, title, setTitle, save }: any) => {
  const [agent, setAgent] = useState(block.agent || { name: '', agency: '', email: '' });

  return (
    <div className="space-y-4 py-4">
      <Field label="Section Title" value={title} onChange={setTitle} />
      <Field label="Agent Name" value={agent.name} onChange={v => setAgent({ ...agent, name: v })} />
      <Field label="Agency" value={agent.agency} onChange={v => setAgent({ ...agent, agency: v })} />
      <Field label="Email" value={agent.email || ''} onChange={v => setAgent({ ...agent, email: v })} />
      <Button onClick={() => save({ agent })} className="w-full">Save</Button>
    </div>
  );
};

// ── Social ───────────────────────────────────────────────────

const SocialEditForm = ({ block, title, setTitle, save }: any) => {
  const [links, setLinks] = useState(block.socialLinks || []);

  const addLink = () => setLinks([...links, { href: '', logo: '', label: '' }]);
  const removeLink = (i: number) => setLinks(links.filter((_: any, idx: number) => idx !== i));
  const updateLink = (i: number, key: string, val: string) => {
    const updated = [...links];
    updated[i] = { ...updated[i], [key]: val };
    setLinks(updated);
  };

  return (
    <div className="space-y-4 py-4">
      <Field label="Section Title" value={title} onChange={setTitle} />
      {links.map((l: any, i: number) => (
        <div key={i} className="p-3 border rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-muted-foreground">{l.label || `Link ${i + 1}`}</span>
            <Button variant="ghost" size="sm" onClick={() => removeLink(i)} className="h-6 text-xs text-destructive">Remove</Button>
          </div>
          <Field label="Label" value={l.label} onChange={v => updateLink(i, 'label', v)} placeholder="Instagram" />
          <Field label="URL" value={l.href} onChange={v => updateLink(i, 'href', v)} placeholder="https://instagram.com/..." />
          <Field label="Icon URL" value={l.logo} onChange={v => updateLink(i, 'logo', v)} placeholder="https://..." />
        </div>
      ))}
      <Button variant="outline" onClick={addLink} className="w-full">+ Add Link</Button>
      <Button onClick={() => save({ socialLinks: links })} className="w-full">Save</Button>
    </div>
  );
};

// ── Link ─────────────────────────────────────────────────────

const LinkEditForm = ({ block, title, setTitle, save }: any) => {
  const [url, setUrl] = useState(block.url || '');
  return (
    <div className="space-y-4 py-4">
      <Field label="Label" value={title} onChange={setTitle} />
      <Field label="URL" value={url} onChange={setUrl} placeholder="https://..." />
      <Button onClick={() => save({ url })} className="w-full">Save</Button>
    </div>
  );
};
