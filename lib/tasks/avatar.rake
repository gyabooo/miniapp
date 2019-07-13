namespace :avatar do
  desc "Delete active_storage_blobs with nil"
  task delete_blobs: :environment do
    ActiveStorage::Blob.unattached.find_each(&:purge)
  end
end