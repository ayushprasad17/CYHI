import { useEffect, useMemo, useState } from 'react';
import { SearchIcon, EyeIcon, EditIcon, TrashIcon } from '../components/Icons.jsx';
import { initials, pillClass, uniq } from '../utils/helpers.js';
import { STUDENTS_PER_PAGE } from '../data/initialData.js';

export default function Students({
  students, onDelete, showToast, onConfirmDelete,
}) {
  const [search, setSearch] = useState('');
  const [fDept, setFDept] = useState('');
  const [fSem, setFSem] = useState('');
  const [fStatus, setFStatus] = useState('');
  const [page, setPage] = useState(1);

  const depts = useMemo(() => uniq(students.map((s) => s.dept)), [students]);
  const sems = useMemo(() => uniq(students.map((s) => s.sem)), [students]);

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter((s) => (s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q))
      && (!fDept || s.dept === fDept)
      && (!fSem || s.sem === fSem)
      && (!fStatus || s.status === fStatus));
  }, [students, search, fDept, fSem, fStatus]);

  const totalPages = Math.max(1, Math.ceil(rows.length / STUDENTS_PER_PAGE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const start = (page - 1) * STUDENTS_PER_PAGE;
  const pageRows = rows.slice(start, start + STUDENTS_PER_PAGE);

  const pagerButtons = [];
  for (let i = 1; i <= totalPages; i++) pagerButtons.push(i);

  return (
    <section className="page active">
      <div className="page-head">
        <div><h1>Students</h1><p>View and manage registered students</p></div>
      </div>

      <div className="filter-bar">
        <div className="search-box" style={{ maxWidth: 320 }}>
          <SearchIcon />
          <input type="text" placeholder="Search students..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select value={fDept} onChange={(e) => { setFDept(e.target.value); setPage(1); }}>
          <option value="">All Departments</option>
          {depts.map((d) => <option key={d}>{d}</option>)}
        </select>
        <select value={fSem} onChange={(e) => { setFSem(e.target.value); setPage(1); }}>
          <option value="">All Semesters</option>
          {sems.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={fStatus} onChange={(e) => { setFStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option>Active</option><option>Inactive</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Student</th><th>Roll No.</th><th>Department</th><th>Semester</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            {pageRows.length ? pageRows.map((s) => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="badge-round" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>{initials(s.name)}</div>
                    <div>
                      <div className="cell-title">{s.name}</div>
                      <div className="cell-sub">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td>{s.roll}</td>
                <td>{s.dept}</td>
                <td>{s.sem}</td>
                <td><span className={`pill ${pillClass(s.status)}`}>{s.status}</span></td>
                <td>{s.joined}</td>
                <td className="actions">
                  <button className="icon-btn btn-sm" title="View" onClick={() => showToast(`Viewing ${s.name}`)}><EyeIcon /></button>
                  <button className="icon-btn btn-sm" title="Edit" onClick={() => showToast(`Edit ${s.name} (demo)`)}><EditIcon /></button>
                  <button className="icon-btn btn-sm" title="Remove" onClick={() => onConfirmDelete(() => onDelete(s.id))}><TrashIcon /></button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={7}><div className="empty-state">No students match your filters.</div></td></tr>
            )}
          </tbody>
        </table>
        <div className="table-foot">
          <span>{rows.length ? `Showing ${start + 1}-${Math.min(start + STUDENTS_PER_PAGE, rows.length)} of ${rows.length} students` : 'No students found'}</span>
          <div className="pager">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
            {pagerButtons.map((i) => (
              <button key={i} className={i === page ? 'active' : ''} onClick={() => setPage(i)}>{i}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
