// Code generated by ent, DO NOT EDIT.

package ent

import (
	"Ebook/ent/miss"
	"Ebook/ent/user"
	"fmt"
	"strings"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
)

// Miss is the model entity for the Miss schema.
type Miss struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// UserID holds the value of the "user_id" field.
	UserID int `json:"user_id,omitempty"`
	// Count holds the value of the "count" field.
	Count int `json:"count,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the MissQuery when eager-loading is set.
	Edges        MissEdges `json:"edges"`
	selectValues sql.SelectValues
}

// MissEdges holds the relations/edges for other nodes in the graph.
type MissEdges struct {
	// User holds the value of the user edge.
	User *User `json:"user,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
}

// UserOrErr returns the User value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e MissEdges) UserOrErr() (*User, error) {
	if e.User != nil {
		return e.User, nil
	} else if e.loadedTypes[0] {
		return nil, &NotFoundError{label: user.Label}
	}
	return nil, &NotLoadedError{edge: "user"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Miss) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case miss.FieldID, miss.FieldUserID, miss.FieldCount:
			values[i] = new(sql.NullInt64)
		default:
			values[i] = new(sql.UnknownType)
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Miss fields.
func (m *Miss) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case miss.FieldID:
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			m.ID = int(value.Int64)
		case miss.FieldUserID:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field user_id", values[i])
			} else if value.Valid {
				m.UserID = int(value.Int64)
			}
		case miss.FieldCount:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field count", values[i])
			} else if value.Valid {
				m.Count = int(value.Int64)
			}
		default:
			m.selectValues.Set(columns[i], values[i])
		}
	}
	return nil
}

// Value returns the ent.Value that was dynamically selected and assigned to the Miss.
// This includes values selected through modifiers, order, etc.
func (m *Miss) Value(name string) (ent.Value, error) {
	return m.selectValues.Get(name)
}

// QueryUser queries the "user" edge of the Miss entity.
func (m *Miss) QueryUser() *UserQuery {
	return NewMissClient(m.config).QueryUser(m)
}

// Update returns a builder for updating this Miss.
// Note that you need to call Miss.Unwrap() before calling this method if this Miss
// was returned from a transaction, and the transaction was committed or rolled back.
func (m *Miss) Update() *MissUpdateOne {
	return NewMissClient(m.config).UpdateOne(m)
}

// Unwrap unwraps the Miss entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (m *Miss) Unwrap() *Miss {
	_tx, ok := m.config.driver.(*txDriver)
	if !ok {
		panic("ent: Miss is not a transactional entity")
	}
	m.config.driver = _tx.drv
	return m
}

// String implements the fmt.Stringer.
func (m *Miss) String() string {
	var builder strings.Builder
	builder.WriteString("Miss(")
	builder.WriteString(fmt.Sprintf("id=%v, ", m.ID))
	builder.WriteString("user_id=")
	builder.WriteString(fmt.Sprintf("%v", m.UserID))
	builder.WriteString(", ")
	builder.WriteString("count=")
	builder.WriteString(fmt.Sprintf("%v", m.Count))
	builder.WriteByte(')')
	return builder.String()
}

// Misses is a parsable slice of Miss.
type Misses []*Miss
