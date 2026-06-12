import styles from './Table.module.css';
import { tableAlignClasses, tableDensityClasses } from './table.tokens';

/**
 * Table UI Base
 *
 * Componente reutilizable para visualización tabular de datos.
 *
 * Soporta:
 * - headers
 * - rows
 * - caption
 * - striped
 * - hoverable
 * - densidad configurable
 * - alineación configurable
 * - estado vacío
 *
 * Density:
 * - default
 * - dense
 *
 * Alignment:
 * - left
 * - center
 * - right
 *
 * Uso recomendado:
 * - directorios
 * - tablas informativas
 * - CMS futuro
 * - dashboards simples
 * - comparativas
 *
 * Reglas:
 * - Mantener responsive mediante overflow horizontal.
 * - Consumir variables globales.
 * - No hardcodear colores.
 * - Mantener desacoplada la fuente de datos.
 */

export function Table({
  columns = [],
  rows = [],
  caption,
  emptyMessage = 'No hay datos disponibles.',
  striped = false,
  hoverable = false,
  density = 'default',
  className = '',
}) {
  if (!Array.isArray(columns) || columns.length === 0) {
    return null;
  }

  const densityClass = tableDensityClasses[density] || tableDensityClasses.default;

  const tableClassName = [
    styles.table,
    styles[densityClass],
    striped ? styles.striped : '',
    hoverable ? styles.hoverable : '',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClassName = [styles.wrapper, className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName}>
      <table className={tableClassName}>
        {caption && <caption className={styles.caption}>{caption}</caption>}

        <thead>
          <tr>
            {columns.map((column) => {
              const alignKey = tableAlignClasses[column.align || 'left'];
              return (
                <th
                  key={column.key}
                  scope="col"
                  className={alignKey ? styles[alignKey] : ''}
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex}>
                {columns.map((column) => {
                  const alignKey = tableAlignClasses[column.align || 'left'];
                  const value = row[column.key];

                  return (
                    <td
                      key={column.key}
                      className={alignKey ? styles[alignKey] : ''}
                    >
                      {column.render
                        ? column.render(value, row, rowIndex)
                        : value ?? '-'}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}