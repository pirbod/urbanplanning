import type { Role } from "../../types";
import { roleSummary, roles } from "../../utils/rolePermissions";

interface HeaderProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

export const Header = ({ role, onRoleChange }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-4 border-b border-ink/10 bg-paper/86 px-5 py-4 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-clay">Demo environment</p>
        <h2 className="font-display text-2xl font-semibold text-ink">UrbanTwin Azure Planning PoC</h2>
        <p className="mt-1 text-sm text-ink/60">Berlin-style mock planning portfolio, ready for stakeholder walkthroughs.</p>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white/70 p-3 sm:flex-row sm:items-center">
        <label htmlFor="role" className="text-sm font-semibold text-ink/70">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(event) => onRoleChange(event.target.value as Role)}
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-harbor"
        >
          {roles.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="max-w-md text-xs text-ink/55">{roleSummary(role)}</span>
      </div>
    </header>
  );
};
