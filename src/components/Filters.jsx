const districts = [
  'All Districts',
  'ARIYALUR',
  'CHENGALPATTU',
  'CHENGALPET',
  'CHENNAI',
  'COIMBATORE',
  'CUDDALORE',
  'DHARMAPURI',
  'DINDIGUL',
  'ERODE',
  'KALLAKURICHI',
  'KANCHEEPURAM',
  'KANCHIPURAM',
  'KANNIYAKUMARI',
  'KANYAKUMARI',
  'KARUR',
  'KRISHNAGIRI',
  'MADHURAI',
  'MAYILADUTHURAI',
  'NAGAPATTINAM',
  'NAMKKAL',
  'PERAMBALUR',
  'PUDUKKOTTAI',
  'RAMANANTHAPURAM',
  'RANIPET',
  'SALEM',
  'SIVANGANGAI',
  'TENKASI',
  'THANJAVUR',
  'THE NILGIRIS',
  'THENI',
  'THOOTHUKUDI',
  'THIRUCHIRAPPALI',
  'TIRUNELVELI',
  'TIRUPPUR',
  'TIRUVALLUR',
  'THIRUVANNAMALAI',
  'THIRUVARUR',
  'TRICHIRAPPALI',
  'VELLORE',
  'VILUPPURAM',
  'VIRUDHUNAGAR',
]

const courses = [
  'All Courses',
  'Computer Science Engineering',
  'Electronics and Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
]

const collegeTypes = [
  'All Types',
  'Government',
  'Private',
  'Autonomous',
]

export default function Filters({ filters, onFilterChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target

    onFilterChange({
      ...filters,
      [name]: value,
    })
  }

  const clearFilters = () => {
    onFilterChange({
      district: 'All Districts',
      course: 'All Courses',
      collegeType: 'All Types',
    })
  }

  return (
    <div className="border-b border-ledger-rule">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wide text-ledger-ink/50">
            Refine your search
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="font-mono text-xs text-ledger-ink/50 hover:text-ledger-ink"
          >
            Clear filters
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            name="district"
            value={filters.district}
            onChange={handleChange}
            className="flex-1 rounded-lg border border-ledger-rule bg-white px-3 py-2 text-sm text-ledger-ink outline-none"
          >
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <select
            name="course"
            value={filters.course}
            onChange={handleChange}
            className="flex-1 rounded-lg border border-ledger-rule bg-white px-3 py-2 text-sm text-ledger-ink outline-none"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            name="collegeType"
            value={filters.collegeType}
            onChange={handleChange}
            className="flex-1 rounded-lg border border-ledger-rule bg-white px-3 py-2 text-sm text-ledger-ink outline-none"
          >
            {collegeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}