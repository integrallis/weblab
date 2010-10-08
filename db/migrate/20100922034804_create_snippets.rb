class CreateSnippets < ActiveRecord::Migration
  def self.up
    create_table :snippets do |t|
      t.string :title
      t.text :code, :default => %[log.info( 'JavaScript did this!' );]
      t.text :markup
      t.text :css
      t.boolean :visual, :default => false

      t.timestamps
    end
  end

  def self.down
    drop_table :snippets
  end
end


